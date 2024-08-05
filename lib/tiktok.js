import fetch from 'node-fetch';

export function tiktokdl(url) {
    return new Promise(async(resolve, rejcet) => {
        try {
            let data = await fetch("https://lovetik.com/api/ajax/search", {
                method: 'POST',
                body: new URLSearchParams(Object.entries({ query: url }))
            });

            data = await data.json();

            let audio = data.links.find((v) => v.t.includes(' MP3 '));
            let video = data.links.find((v) => v.s.includes(' [720x1280]'));

            if (data.links) delete data.links;

            resolve({
                ...data,
                audio,
                video
            });
        } catch(e) {
            rejcet(String(e));
        };
    });
};