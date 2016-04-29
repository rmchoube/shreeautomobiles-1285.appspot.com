package shreeautomobiles

import (
	"bytes"
	"io"
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/log"
	"google.golang.org/appengine/mail"
	"google.golang.org/appengine/urlfetch"
)

var (
	paypal_url = "https://www.sandbox.paypal.com/cgi-bin/webscr"
)

func init() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)
	http.HandleFunc("/ipn", ipn)
	http.HandleFunc("/contactus", contactus)
}

type teeReadCloser struct {
	r io.ReadCloser
	w io.Writer
}

func TeeReadCloser(r io.ReadCloser, w io.Writer) io.ReadCloser {
	return &teeReadCloser{r, w}
}

func (t *teeReadCloser) Read(p []byte) (n int, err error) {
	n, err = t.r.Read(p)
	if n > 0 {
		if n, err := t.w.Write(p[:n]); err != nil {
			return n, err
		}
	}
	return
}

func (t *teeReadCloser) Close() error {
	return t.r.Close()
}

func ipn(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	log.Infof(c, "IPN received from paypal")

	if r.Method != "POST" {
		log.Errorf(c, "not POST request. method: %s", r.Method)
		return
	}

	client := urlfetch.Client(c)

	var buf bytes.Buffer
	buf.WriteString("cmd=_notify-validated&")
	r.Body = TeeReadCloser(r.Body, &buf)
	r.ParseForm()
	client.Post(paypal_url, "application/x-www-form-urlencoded", &buf)
	log.Infof(c, "%v", r.Form)
	for k, v := range r.Form {
		log.Infof(c, "key: %s", k)
		log.Infof(c, "val: %s", v)
	}
	msg := &mail.Message{
		Sender:  "Shree Automobiles <shreeautomobiles06@gmail.com>",
		To:      []string{"akolabranch9@gmail.com"},
		Subject: "sale information",
		Body:    createSaleDetailsMsg(r.Form),
	}
	if err := mail.Send(c, msg); err != nil {
		log.Errorf(c, "Couldn't send email: %v", err)
	}
}

var custDetails = [][]string{
	{"address_name", "Customer: "},
	{"address_street", "Street: "},
	{"address_city", "City: "},
	{"address_state", "State: "},
	{"address_country", "Country: "},
	{"address_zip", "Zip: "},
	{"payer_email", "Email: "},
}

var itemDetails = [][]string{
	{"item_name", "Item: "},
	{"item_number", "Item No:. "},
	{"quantity", "Quantity: "},
}

var paymentDetails = [][]string{
	{"invoice", "Invoice: "},
	{"txn_id", "Transaction Id: "},
	{"payment_status", "Payment Status: "},
	{"payment_date", "Payment Date: "},
}

func createSaleDetailsMsg(form map[string][]string) string {
	emailBody := convertDetailsToStr(form, custDetails)
	emailBody += convertDetailsToStr(form, itemDetails)
	emailBody += convertDetailsToStr(form, paymentDetails)
	return emailBody
}

func convertDetailsToStr(form map[string][]string, details [][]string) string {
	str := ""
	for i := 0; i < len(details); i++ {
		k := details[i][0]
		if v, ok := form[k]; ok {
			str += details[i][1] + concat(v) + "\n"
		}
	}
	return str
}

func concat(arr []string) string {
	s := ""
	for i := 0; i < len(arr); i++ {
		s += arr[i]
		if i > 0 {
			s += ","
		}
	}
	return s
}

var contactUsDetails = [][]string{
	{"branch", "Branch: "},
	{"name", "Name: "},
	{"contact", "Contact No.: "},
	{"email", "Email: "},
	{"msg", "Message: "},
}

func contactus(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	log.Infof(c, "Received contactus.")

	if r.Method != "POST" {
		log.Errorf(c, "not POST request. method: %s", r.Method)
		return
	}

	r.ParseForm()
	log.Infof(c, "%v", r.Form)
	for k, v := range r.Form {
		log.Infof(c, "key: %s", k)
		log.Infof(c, "val: %s", v)
	}
	msg := &mail.Message{
		Sender:  "Shree Automobiles <shreeautomobiles06@gmail.com>",
		To:      []string{"akolabranch9@gmail.com"},
		Subject: "Message from customer",
		Body:    convertDetailsToStr(r.Form, contactUsDetails),
	}
	if err := mail.Send(c, msg); err != nil {
		log.Errorf(c, "Couldn't send email: %v", err)
	}
	http.Redirect(w,
		r,
		"http://shreeautomobiles-1285.appspot.com/ThnkContactpg.html",
		http.StatusFound)
}
