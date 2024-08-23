export const FILE_FORMATS = {
  DOC: 'DOC',
  DOCX: 'DOCX',
  PDF: 'PDF',
  XLS: 'XLS',
  XLSX: 'XLSX',
  TXT: 'TXT',
  XML: 'XML',
  JPG: 'JPG',
  JPEG: 'JPEG',
  PJPG: 'PJPG',
  PNG: 'PNG',
  GIF: 'GIF',
  ZIP: 'ZIP',
  X_ZIP: 'X_ZIP',
  X_ZIP_COMPRESSED: 'X_ZIP_COMPRESSED',
};

export const FILE_FORMAT_MIME_TYPES = {
  [FILE_FORMATS.DOC]: 'application/msword',
  [FILE_FORMATS.DOCX]: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  [FILE_FORMATS.PDF]: 'application/pdf',
  [FILE_FORMATS.XLS]: 'application/vnd.ms-excel',
  [FILE_FORMATS.ZIP]: 'application/zip',
  [FILE_FORMATS.X_ZIP]: 'application/x-zip',
  [FILE_FORMATS.X_ZIP_COMPRESSED]: 'application/x-zip-compressed',
  [FILE_FORMATS.XLSX]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  [FILE_FORMATS.TXT]: 'text/plain',
  [FILE_FORMATS.XML]: 'text/xml',
  [FILE_FORMATS.JPG]: 'image/jpeg',
  [FILE_FORMATS.JPEG]: 'image/jpeg',
  [FILE_FORMATS.PJPG]: 'image/pjpeg',
  [FILE_FORMATS.PNG]: 'image/png',
  [FILE_FORMATS.GIF]: 'image/gif',
};

export const EMAIL_PATTERN = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i