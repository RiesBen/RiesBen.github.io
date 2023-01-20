//Build nav bar


function hide_navB() {
    var box = document.getElementById('navbar');
    // Code for Chrome, Safari, Opera
    box.style.WebkitTransform = "translate(-100%)";
    box.innerHtml = " asd";
    // Code for IE9
    box.style.msTransform = "translate(-100%)";
    // Standard syntax
    box.style.transform = "translate(-100%)";

    ////link back home
    box = document.getElementsByTagName('body')[0];
    if (document.getElementById("hiderTwo") == null) {
        var link_hide = document.createElement("a")
        link_hide.className = "icon  fa-bars pages"
        link_hide.id = "hiderTwo"
        link_hide.onclick = show_navB
        link_hide.style.setProperty("opacity", "0");

        var text_hide = document.createElement("span")
        text_hide.textContent = "Hide"
        text_hide.className = "label"
        link_hide.appendChild(text_hide)
        box.append(link_hide)
    } else {
        link_hide = document.getElementById("hiderTwo");
        link_hide.style.setProperty("transition-duration", "5s")
        link_hide.style.setProperty("opacity", "1");
    }
    //adjust margin
    var content = document.getElementById('content');
    content.style.setProperty("margin-left", "2%")
    content.style.setProperty("width", "98%")

    link_hide.style.setProperty("opacity", "1");


}

function show_navB() {
    var box = document.getElementById('navbar');

    // Code for Chrome, Safari, Opera
    box.style.WebkitTransform = "translate(0%)";
    box.innerHtml = " asd";
    // Code for IE9
    box.style.msTransform = "translate(0%)";
    // Standard syntax
    box.style.transform = "translate(0%)";

    var content = document.getElementById('content');
    content.style.setProperty("margin-left", "8%")
    content.style.setProperty("width", "92%")


    var link_hide = document.getElementById('hiderTwo');
    link_hide.style.setProperty("transition-duration", "2s")
    link_hide.style.setProperty("opacity", "0")

}

function build_navB() {
//////////////////////////////////////////////////
    var box = document.getElementById('navbar');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//List one with homepage links
    var list_one = document.createElement("ul")
    list_one.className = "navBar"

////link back home
    var li_zero = document.createElement("li")
    li_zero.id = "hider"
    li_zero.className = "pages"
    var link_hide = document.createElement("a")
    link_hide.className = "icon  fa-bars"
    link_hide.onclick = hide_navB

    var text_hide = document.createElement("span")
    text_hide.textContent = "Hide"
    text_hide.className = "label"
    link_hide.appendChild(text_hide)
    li_zero.appendChild(link_hide)

////link back home
    var li_one = document.createElement("li")
    li_one.className = "pages"
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
    li_two.className = "pages"
    var link_science = document.createElement("a")
    link_science.href = "science.html"
    link_science.className = "icon  fa-flask"
    var text_science = document.createElement("span")
    text_science.textContent = "scientific interest"
    text_science.className = "label"
    link_science.appendChild(text_science)
    li_two.appendChild(link_science)
////link back coding
    var li_three = document.createElement("li")
    li_three.className = "pages"
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
    li_four.className = "pages"
    var link_hobby = document.createElement("a")
    link_hobby.href = "hobbies.html"
    link_hobby.className = "icon  fa-coffee"
    var text_hobby = document.createElement("span")
    text_hobby.textContent = "hobbies"
    text_hobby.className = "label"
    link_hobby.appendChild(text_hobby)
    li_four.appendChild(link_hobby)

////append lists
    list_one.appendChild(li_zero)
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
    link_git.href = "https://github.com/RiesBen"
    link_git.className = "icon  fa-github"
    var text_git = document.createElement("span", "class=\"label\"")
    text_git.className = "label"
    text_git.textContent = "Github"
    link_git.appendChild(text_git)
    li_t_four.appendChild(link_git)

//// link orcid
    var li_t_five = document.createElement("li")
    li_t_five.id = "contacts"
    var link_orcid = document.createElement("a")
    link_orcid.href = "https://orcid.org/0000-0002-0945-8304"
    link_orcid.className = "icon "

    var text_orcid = document.createElement("span", "class=\"label\"")
    text_orcid.className = "label"
    text_orcid.textContent = "ORCiD"

    var img_orcid = document.createElement("img", "class=\"icon\"")
    img_orcid.src="../fonts/orcid.svg"
    img_orcid.href = "https://orcid.org/0000-0002-0945-8304"
    img_orcid.id = "extra"

    link_orcid.appendChild(img_orcid)
    li_t_five.appendChild(link_orcid)

// append to second link
    list_two.appendChild(li_t_two)
    list_two.appendChild(li_t_three)
    list_two.appendChild(li_t_four)
    list_two.appendChild(li_t_five)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    box.appendChild(list_one)
    box.appendChild(list_two)
}


build_navB()