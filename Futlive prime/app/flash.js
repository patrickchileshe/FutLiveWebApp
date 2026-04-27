import { deleteCookie, setCookie, getCookies } from "@std/http/cookie";
import { encodeBase64Url, decodeBase64Url } from "@std/encoding";

export function setFlash(headers, message) {
    setCookie(headers, {
        name: "flash",
        value: encodeBase64Url(message),
        path: "/"
    });
}

export function getFlash(requestHeaders, responseHeaders) {
    const {flash} = getCookies(requestHeaders);
    if (flash) {
        deleteCookie(responseHeaders, "flash", {path: "/"});
        console.log("Remember to delete the flash cookie once it's been used");
        return new TextDecoder().decode(decodeBase64Url(flash));
    }
}