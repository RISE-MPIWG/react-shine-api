// base64 encodings of the icons used in this component

let close = `data:image/jpeg;base64,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`
let logoHeader = `data:image/jpeg;base64,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`;
let search = `data:image/jpeg;base64,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`;
let upArrow = `data:image/jpeg;base64,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`;

export{
  close,
  logoHeader,
  search,
  upArrow
}