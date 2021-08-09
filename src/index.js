import "./styles.css";

const videoWrapper = document.getElementById("video-wrapper");

const main = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoParameter = urlParams.get("yt");

  if (!videoParameter) {
    document.body.innerHTML = "Define a video using the 'yt' query parameter";
    return;
  }

  const getVideoFromUrl = (url) => {
    // https://stackoverflow.com/a/9102270/3276759

    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\v=)([^#\\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }

    const fallbackRegex = /v=([^\\s&#]*)/;
    const fallbackMatch = url.match(fallbackRegex);

    if (fallbackMatch && fallbackMatch[1]) {
      return fallbackMatch[1];
    }

    return null;
  };

  const getVideoId = () => {
    const videoIdFromUrl = getVideoFromUrl(videoParameter);
    return videoIdFromUrl ? videoIdFromUrl : videoParameter;
  };

  const videoId = getVideoId();

  videoWrapper.innerHTML = `
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
  `;
};

main();
