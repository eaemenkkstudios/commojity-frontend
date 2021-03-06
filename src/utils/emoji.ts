const emojis =
  '๐๐๐๐ญ๐ฟ๐ง๐ฅ๐ฅ๐ณ๐ง๐ฅ๐ง๐๐ฅ๐ฅจ๐ฅฏ๐ฅ๐ฎ๐ง๐ฅ๐ฅ๐ฅช๐ฎ๐ฏ๐ฏ๐ฅซ๐๐๐ฅฉ๐ ๐ฅ๐ฅ ๐ฅก๐ฑ๐๐๐๐๐๐ฆช๐ฃ๐ค๐ฅ๐ฅฎ๐ข๐ง๐ฅ๐ฒ๐ฅ๐๐ฅฃ๐ฅง๐ฆ๐ง๐จ๐ฉ๐ช๐๐ฐ๐ง๐ซ๐ฌ๐ญ๐ก๐๐๐๐งจ๐๐๐๐๐๐๐๐๐๐๐งง๐๐๐ซ๐ ๐ก๐ข๐ช๐ญ๐จ๐งต๐ฏ๐งถ๐ฎ๐๐๐ฆบ๐ฅฝ๐ฅผ๐งฅ๐๐๐๐ฉณ๐งฃ๐งค๐งฆ๐๐ฅป๐๐๐ฉฒ๐ฉฑ๐๐๐๐๐๐๐๐คฃ๐๐๐๐๐๐๐๐๐๐๐ฅฐ๐๐๐ค ๐๐๐ค๐คฉ๐ค๐คจ๐๐๐ถ๐๐๐ฃ๐ฅ๐ฎ๐ค๐ฏ๐ช๐ซ๐ฅฑ๐ด๐๐๐๐๐คค๐๐๐๐๐๐ค๐ฒ๐๐๐๐๐ค๐ข๐ญ๐ฆ๐ง๐จ๐๐ฆ๐ฆง๐ฉ๐๐๐๐๐๐ฆ๐ฆ๐ฆ๐๐๐๐๐๐๐๐ช๐ซ๐ฆ๐ฆ๐ฆฅ๐ฆจ๐ฆก๐๐๐๐ฆ๐๐ฆ๐๐ข๐๐๐ฆ๐ฆ๐ฆฆ๐ฆ๐ฌ๐ณ๐๐๐ ๐ก๐ฆ๐ฆ๐๐ฆ๐ฆ๐๐ฆ๐๐ฆ๐ฆ๐ฆข๐ฆ๐ฆฉ๐ฆ๐ฆ๐ฆ๐ง๐ฅ๐ฆ๐ฆ๐๐๐ฆ๐ฆ๐๐๐ฆ๐๐๐๐บ๐๐๐๐';
const emojiByte = 2;

export function emojiToBase64(emoji: string): string {
  let binaryString = '';
  for (let i = 0; i < emoji.length; i += emojiByte) {
    const index = emojis.indexOf(emoji.slice(i, i + emojiByte)) / emojiByte;
    if (index < 0) throw new Error();
    binaryString += String.fromCharCode(index);
  }
  return window.btoa(binaryString);
}

export function base64ToEmoji(base64: string): string {
  const binaryString = window.atob(base64);
  let emojiString = '';
  for (let i = 0; i < binaryString.length; i += 1)
    emojiString += emojis.slice(
      binaryString.charCodeAt(i) * emojiByte,
      binaryString.charCodeAt(i) * emojiByte + emojiByte,
    );

  return emojiString;
}

export function getKeyboardEmojis(emojisPerLine: number): string[] {
  const keyBoardEmojis: string[] = [];

  emojis
    .match(new RegExp(`.{1,${emojisPerLine * 2}}`, 'g'))
    ?.map((emojiLine, index) =>
      emojiLine.split('').forEach((_, halfIndex, emojiLineArray) => {
        if (halfIndex % 2 === 0)
          keyBoardEmojis[index] = `${keyBoardEmojis[index] || ''}${
            halfIndex === 0 ? '' : ' '
          }${emojiLineArray[halfIndex]}${emojiLineArray[halfIndex + 1]}`;
      }),
    );

  keyBoardEmojis[0] += ' {bksp}';

  return keyBoardEmojis;
}
