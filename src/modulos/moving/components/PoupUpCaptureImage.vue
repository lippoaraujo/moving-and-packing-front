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
    variavelIdArrayComodo: {
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
        if (value) {
          this.verificaOpenCamera();
        }
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
    getValorvariavelIdArrayComodo: {
      get() {
        return this.variavelIdArrayComodo;
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
        let first2 = this.devices[this.devices.length - 1];
        this.camera = first2.deviceId;
        this.deviceId = first2.deviceId;
      }
    },
  },

  methods: {
    base64ToCanvas: async function (
      base64Str,
      IdMudanca,
      IdComodo,
      IdArrayComodo,
      callback,
      callback2
    ) {
      var img = new Image();
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      console.log("tamnho inicio");
      console.log(base64Str.length);

      img.onload = function () {
        /* 11111111
        var scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        // get the top left position of the image
        var x = canvas.width / 2 - (img.width / 2) * scale;
        var y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        111111111*/

        // get the scale
        var scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        // get the top left position of the image
        var x = canvas.width / 2 - (img.width / 2) * scale;
        var y = canvas.height / 2 - (img.height / 2) * scale;

        console.log(" x " + x);
        console.log(" y " + y);

        console.log(" img.width * scale " + img.width * scale);
        console.log(" img.width * scale " + img.height * scale);

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        //ctx.drawImage(img, 0, 0, img.width * 0.5, img.height * 0.5);

        //ctx.drawImage(img, 0, 0, 100, img.height * (100 / img.width));

        console.log("tamnho fim");
        console.log(canvas.toDataURL().length);

        let objRetun = new Object();
        objRetun.idMudanca = IdMudanca;
        objRetun.idComodo = IdComodo;
        objRetun.imgBase64 = canvas.toDataURL();
        objRetun.idArrayComodo = IdArrayComodo;
        callback(objRetun);
        callback2(false);
      };
      //console.log(base64Str);
      img.src = base64Str;
      //console.log(img.src);
      //img.setAttribute("src", '"' + base64Str + '"');
    },

    onCapture: async function () {
      let base64 = this.$refs.webcam.capture();
      setImageStorageSession(
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo,
        base64,
        this.getValorvariavelIdArrayComodo
      );
      this.closeModalImage();

      /*await this.base64ToCanvas(
        base64,
        this.getValorVariavelIdMudanca,
        this.getValorvariavelIdComodo,
        this.getValorvariavelIdArrayComodo,
        function (resultObject) {
          setImageStorageSession(
            resultObject.idMudanca,
            resultObject.idComodo,
            resultObject.imgBase64,
            resultObject.idArrayComodo
          );
        },
        this.closeModalImage
      );*/

      //console.log(localStorage.getItem("storageListaImagensComodoNovo"));
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
      //console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      //console.log("On Camera Change Event", deviceId);
    },

    con: function () {
      setTimeout(() => {
        (this.showCamera = false), this.definir();
      }, 200);
    },

    verificaOpenCamera: function () {
      //this.onStop();
      //this.onStart();
    },

    closeModalImage: function (value) {
      //this.onStop();
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
