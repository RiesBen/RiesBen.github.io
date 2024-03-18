
(function() {
    $(".sciareas")
    .find("svg")
    .each(function(i) {
    var c, cbar, circle, percent, r;
    circle = $(this).children(".cbar");
    r = circle.attr("r");
    c = Math.PI * (r * 2);
    percent = $(this)
        .parent()
        .data("percent");
    cbar = (100 - percent - 20) / 100 * c;
    circle.css({
        "stroke-dashoffset": c,
        "stroke-dasharray": c
    });
    circle.delay(i * 150).animate(
        {
        strokeDashoffset: cbar
        },
        1000,
        "linear",
        function() {
        return circle.css({
            "transition-duration": ".3s"
        });
        }
    );
    $(this)
        .siblings("small")
        .prop("Counter", 0)
        .delay(i * 150)
        .animate(
        {
            Counter: percent
        },
        {
            duration: 1000,
            step: function(now) {
            return $(this).text(Math.ceil(now) + "%");
            }
        }
        );
    });
}.call(this));
