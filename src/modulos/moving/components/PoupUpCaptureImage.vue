<template>
  <v-row justify="center">
    <v-dialog
      v-model="getValorAbrirJanelaImage"
      persistent
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>Capturar imagem</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <center>
            <vue-web-cam
              ref="webcam"
              :device-id="deviceId"
              width="100%"
              @started="onStarted"
              @stopped="onStopped"
              @error="onError"
              @cameras="onCameras"
              @camera-change="onCameraChange"
            />
            <code v-if="device">Câmera utilizada {{ device.label }}</code>
            <v-select
              label="Lista camera"
              item-text="label"
              item-value="deviceId"
              :items="devices"
              v-model="camera"
            ></v-select>
          </center>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-4" dark text v-on:click="onCapture()">
            Capture image
            <v-icon right dark>mdi-camera</v-icon>
          </v-btn>

          <v-btn
            color="blue darken-4"
            dark
            text
            v-on:click="closeModalImage(false)"
          >
            Cancel
            <v-icon right dark>mdi-camera</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { WebCam } from "vue-web-cam";
import { setImageStorageSession } from "@/modulos/moving/helper/getSetImageStorageSession.js";
//import imageCompression from "browser-image-compression";

export default {
  components: {
    "vue-web-cam": WebCam,
  },

  name: "PoupUpCaptureImage",

  props: {
    variavelShowModalCamera: {
      required: true,
    },
    variavelIdMudanca: {
      required: true,
    },
    variavelIdComodo: {
      required: true,
    },
  },

  data: () => ({
    /*CAM*/
    camera: null,
    deviceId: null,
    devices: [],
    /*CAM*/
  }),

  computed: {
    device: function () {
      return this.devices.find((n) => n.deviceId === this.deviceId);
    },
    getValorAbrirJanelaImage: {
      get() {
        return this.variavelShowModalCamera;
      },
      set(value) {
        this.$emit("update:varOpenDialog", value);
      },
    },

    getValorVariavelIdMudanca: {
      get() {
        return this.variavelIdMudanca;
      },
    },
    getValorvariavelIdComodo: {
      get() {
        return this.variavelIdComodo;
      },
    },
  },

  watch: {
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      const [first] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    },
  },

  methods: {
    onCapture() {
      //https://www.npmjs.com/package/browser-image-compression
      /*const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      };
      let imgBase64 = imageCompression.getFilefromDataUrl(
        this.$refs.webcam.capture(),
        options
      );*/

      /*alert(
        "mudanca " +
          this.getValorVariavelIdMudanca +
          "comodo " +
          this.getValorvariavelIdComodo
      );*/
      setImageStorageSession(
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo,
        this.$refs.webcam.capture()
      );
      //console.log(sessionStorage.getItem("storageListaImagensComodo"));
      this.closeModalImage(false);
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    },

    con: function () {
      setTimeout(() => {
        (this.showCamera = false), this.definir();
      }, 200);
    },

    closeModalImage: function (value) {
      this.$emit("closeModalImage", value);
    },
  },
};
</script>
<style>
.containerAqui {
  display: flex;
  overflow-x: auto;
}
.container img {
  margin-right: 15px;
}
.container::-webkit-scrollbar {
  display: none;
}
</style>
