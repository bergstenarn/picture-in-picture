const videoElement = document.getElementById("video");
const button = document.getElementById("button");
const buttonContainer = document.getElementById("button-container");

// Prompt to select media stream and pass it to the video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    // Catch error here
    console.log("Whoops, error here: ", error);
  }
}

button.addEventListener("click", async () => {
  if (document.pictureInPictureElement) {
    // Leave picture in picture
    document.exitPictureInPicture();
  } else {
    // Disable the button while waiting for picture in picture
    button.disabled = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Enable the button and make it a stop button
    button.disabled = false;
    button.innerText = "STOP";
  }
});

// Restore the start button when leaving picture in picture
videoElement.onleavepictureinpicture = () => {
  button.innerText = "START";
};

// On load
selectMediaStream();
