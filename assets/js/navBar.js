//Build nav bar
/*
<ul class="navBar" id="navBar">
    <li><a href="../../index.html" class="icon  fa-arrow-left"><span class="label">Back</span></a></li>
<li><a href="science.html" class="icon fa-flask"><span class="label">Science Interest</span></a></li>
<li><a href="coding.html" class="icon fa-code"><span class="label">Coding</span></a></li>
<li><a href="hobbies.html" class="icon fa-coffee"><span class="label">Hobby</span></a></li>
</ul>
<ul class="navBar" id="contacts">
    <li><p id="contacts_text">Contact:</p></li>
<li><a href="#" class="icon fa-envelope-o"><span class="label">Email</span></a></li>
<li><a href="" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
<li><a href="https://github.com/derjedi" class="icon fa-github"><span class="label">Github</span></a></li>
</ul>
 */


var box = document.getElementById('navbar');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//List one with homepage links
var list_one = document.createElement("ul")
list_one.className = "navBar"

////link back home
var li_one = document.createElement("li")
li_one.id = "pages"
var link_home = document.createElement("a")
link_home.href = "../../index.html"
link_home.className = "icon  fa-arrow-left"
var text_back = document.createElement("span")
text_back.textContent = "Back"
text_back.className = "label"
link_home.appendChild(text_back)
li_one.appendChild(link_home)
////link back scientific
var li_two = document.createElement("li")
li_two.id = "pages"
var link_science = document.createElement("a")
link_science.href = "science.html"
link_science.className = "icon  fa-flask"
var text_science = document.createElement("span")
text_science.textContent = "scientific interest"
text_science.className="label"
link_science.appendChild(text_science)
li_two.appendChild(link_science)
////link back coding
var li_three = document.createElement("li")
li_three.id = "pages"
var link_coding = document.createElement("a")
link_coding.href = "coding.html"
link_coding.className = "icon  fa-code"
var text_coding = document.createElement("span")
text_coding.className = "label"
text_coding.textContent = "coding"
link_coding.appendChild(text_coding)
li_three.appendChild(link_coding)
////link back hobbies
var li_four = document.createElement("li")
li_four.id = "pages"
var link_hobby = document.createElement("a")
link_hobby.href = "hobbies.html"
link_hobby.className = "icon  fa-coffee"
var text_hobby = document.createElement("span")
text_hobby.textContent = "hobbies"
text_hobby.className = "label"
link_hobby.appendChild(text_hobby)
li_four.appendChild(link_hobby)

////append lists
list_one.appendChild(li_one)
list_one.appendChild(li_two)
list_one.appendChild(li_three)
list_one.appendChild(li_four)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//List two contact
var list_two = document.createElement("ul")
list_two.className = "navBar"
list_two.id = "contacts"
list_two.setAttribute("width", "100%")

//link contacts
var li_t_one = document.createElement("li")
li_t_one.id = "contacts"
var li_t_one_text = document.createElement("p")
li_t_one_text.textContent = "contact"
li_t_one_text.id = "contacts_text"
li_t_one.appendChild(li_t_one_text)
//// link mail
var li_t_two = document.createElement("li")
li_t_two.id = "contacts"
var link_mail = document.createElement("a")
link_mail.href = "mailto:benjamin-ries@outlook.com"
link_mail.className = "icon fa-envelope-o"
var text_mail = document.createElement("span")
text_mail.className = "label"
text_mail.textContent = "mail"
link_mail.appendChild(text_mail)
li_t_two.appendChild(link_mail)
//// link li
var li_t_three = document.createElement("li")
li_t_three.id = "contacts"
var link_linkedin = document.createElement("a")
link_linkedin.href = "https://www.linkedin.com/in/benjamin-ries-b26b23111/"
link_linkedin.className = "icon fa-linkedin"
var text_linkedin = document.createElement("span", "class=\"label\"")
text_linkedin.className = "label"
text_linkedin.textContent = "LinkedIn"
link_linkedin.appendChild(text_linkedin)
li_t_three.appendChild(link_linkedin)
//// link git
var li_t_four = document.createElement("li")
li_t_four.id = "contacts"
var link_git = document.createElement("a")
link_git.href = "https://github.com/SchroederB"
link_git.className = "icon  fa-github"
var text_git = document.createElement("span", "class=\"label\"")
text_git.className = "label"
text_git.textContent = "Github"
link_git.appendChild(text_git)
li_t_four.appendChild(link_git)

// append to second link
list_two.appendChild(li_t_one)
list_two.appendChild(li_t_two)
list_two.appendChild(li_t_three)
list_two.appendChild(li_t_four)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

box.appendChild(list_one)
box.appendChild(list_two)