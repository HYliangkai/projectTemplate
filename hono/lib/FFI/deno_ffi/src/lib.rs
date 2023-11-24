use deno_bindgen::deno_bindgen;
/** Run  use ` deno_bindgen --release --lazy-init` */
#[deno_bindgen(non_blocking)]
pub fn feibonaqi(input: f64) -> f64 {
    if input <= 1.0 {
        return input;
    } else {
        return feibonaqi(input - 1.0) + feibonaqi(input - 2.0);
    }
}
