import { Toast } from "vue-toastification";

declare module "#app" {
  interface NuxtApp {
    $toast: Toast;
  }
}
