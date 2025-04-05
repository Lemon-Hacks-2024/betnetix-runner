// просто прокидываем типизацию
import * as ru from "./ru";
import * as en from "./en";

export type TextsType = typeof ru.GlobalTexts | typeof en.GlobalTexts;
