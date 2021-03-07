$(() => {
  let state = "Background Color";
  let previousState = ["127", "127", "127"];

  function refreshSwatch() {
    const red = $("#red").slider("value"),
      green = $("#green").slider("value"),
      blue = $("#blue").slider("value"),
      hex = hexFromRGB(red, green, blue);
    state === "Background Color" ? $("#swatch").css("background-color", "#" + hex) : $("p").css("color", "#" + hex);
  }

  function hexFromRGB(r, g, b) {
    let hex = [
      r.toString(16),
      g.toString(16),
      b.toString(16)
    ];
    $.each(hex, (nr, val) => {
      if (val.length === 1) {
        hex[nr] = "0" + val;
      }
    });
    return hex.join("").toUpperCase();
  }

  $("#red, #green, #blue").slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch
  });

  $("button").click(function () {
    const title = $(this).text();
    if (title !== state) {
      state = title
      $("button").removeClass("button-active");
      $(this).addClass("button-active")
      const temp = [
        $("#red").slider("value"),
        $("#green").slider("value"),
        $("#blue").slider("value")
      ];
      $("#red").slider('value', previousState[0]);
      $("#green").slider('value', previousState[1]);
      $("#blue").slider('value', previousState[2]);
      previousState = temp;
      refreshSwatch()
    }
  })

  refreshSwatch()
});