// Retain old links as aliases while exposing one seated work destination.
export const canonicalEntry=key=>key==='computer'||key==='notebook'?'workstation':key;
