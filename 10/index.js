function loadVideo() {
  var iframe = document.createElement("iframe");
  iframe.id = "bg-video";
  iframe.src =
	width="50px" height="50px"
    "https://www.youtube.com/embed/Yk68FeoEg18?autoplay=1&loop=1&playlist=Yk68FeoEg18&mute=0&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1&fs=0";
  iframe.frameborder = "1";
  iframe.allow = "autoplay; encrypted-media";
  iframe.allowFullscreen = true;

  document.getElementById("video-placeholder").appendChild(iframe);
}

// Load video when user clicks anywhere
document.body.addEventListener("click", loadVideo, { once: true });
