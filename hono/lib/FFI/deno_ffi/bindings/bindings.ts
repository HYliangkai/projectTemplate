// Auto-generated with deno_bindgen
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== 'string') return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL('../target/release', import.meta.url)

let uri = url.pathname
if (!uri.endsWith('/')) uri += '/'

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === 'windows') {
  uri = uri.replace(/\//g, '\\')
  // Remove leading slash
  if (uri.startsWith('\\')) {
    uri = uri.slice(1)
  }
}

const { symbols } = Deno.dlopen(
  {
    darwin: uri + 'libdeno_ffi.dylib',
    windows: uri + 'deno_ffi.dll',
    linux: uri + 'libdeno_ffi.so',
    freebsd: uri + 'libdeno_ffi.so',
    netbsd: uri + 'libdeno_ffi.so',
    aix: uri + 'libdeno_ffi.so',
    solaris: uri + 'libdeno_ffi.so',
    illumos: uri + 'libdeno_ffi.so',
  }[Deno.build.os],
  {
    feibonaqi: { parameters: ['f64'], result: 'f64', nonblocking: true },
  },
)

export function feibonaqi(a0: number) {
  const rawResult = symbols.feibonaqi(a0)
  const result = rawResult
  return result
}
