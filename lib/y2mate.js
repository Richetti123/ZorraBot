import axios from 'axios';
import fetch from 'node-fetch';

function requestYT(url) {
  return new Promise(async(resolve, reject) => {
    try {
      let body = {
        method: 'POST',
        url: "https://tomp3.cc/api/ajax/search?hl=en",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "es-419,es;q=0.9",
          "Cache-Control": "no-cache",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        },
        data: new URLSearchParams(Object.entries({ query: url, vt: "mp3" })),
      };

      await axios
      .request(body)
      .then(({ data }) => resolve(data))
      .catch(reject);
    } catch(e) {
      reject(String(e));
    };
  });
};

function responseYT(vid, k) {
  return new Promise(async(resolve, reject) => {
    try {
      let body = {
            method: "POST",
            url: "https://tomp3.cc/api/ajax/convert?hl=en",
            data: new URLSearchParams(Object.entries({ vid, k })),
            headers: {
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br, zstd",
              "Accept-Language": "es-419,es;q=0.9",
              "Cache-Control": "no-cache",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
      };

      await axios
      .request(body)
      .then(({ data }) => resolve(data))
      .catch(reject);
    } catch(e) {
      reject(e);
    };
  });
};

function formatYT(data, options) {
  return new Promise(async(resolve, reject) => {
    const { type } = options;
    const formatted_data = [];
    const processFormat = (format) => {
      const info = {
        vid: data.vid,
        id: format.k,
        size: format.size,
        quality: format.q,
        type: format.f
      };
      formatted_data.push(info);
    }

    Object.values((data?.links?.mp4 || {})).forEach(processFormat);

    processFormat(data.links.mp3.mp3128);

    let formatted = formatted_data;

    if (type) {
      formatted = formatted_data.filter((format) => format.type === type);
    } else {
      formatted = formatted_data.find((format) => ["720p", "480p", "360p", "240p", "144p"].includes(format.quality));
    }

    if (formatted) return resolve(formatted);
    else return reject("Error select format!");
  })
}

export function yta(url) {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await requestYT(url);
      let formatted_data = await formatYT(data, { type: 'mp3' });
      let k = formatted_data[0].id;
      let vid = formatted_data[0].vid;
      let response = await responseYT(vid, k);
      let buffer = await fetch(response.dlink);
      buffer = Buffer.from(await buffer.buffer());
      let size = Buffer.byteLength(buffer);

      resolve({
        ...data,
        ...response,
        size,
        buffer
      });
    } catch(e) {
      reject(String(e));
    };
  });
};

export function ytv(url) {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await requestYT(url);
      let formatted_data = await formatYT(data, { type: 'mp4' });
      let k = formatted_data[0].id;
      let vid = formatted_data[0].vid;
      let response = await responseYT(vid, k);
      let buffer = await fetch(response.dlink);
      buffer = Buffer.from(await buffer.buffer());
      let size = Buffer.byteLength(buffer);

      resolve({
        ...data,
        ...response,
        size,
        buffer
      });
    } catch(e) {
      reject(String(e));
    };
  });
};