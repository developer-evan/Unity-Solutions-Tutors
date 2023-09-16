/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import MainLayout from '../../layout/MainLayout';
// import Image from 'react-image';

function ViewFile() {
  const { fileUrl } = useParams();

  const getFileType = (fileUrl) => {
    const extension = fileUrl.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image';
    } else if (extension === 'pdf') {
      return 'pdf';
    }
    return 'unknown';
  };

  const fileType = getFileType(fileUrl);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View File</h1>
      {fileType === 'image' && (
        <img src={fileUrl} alt="Image" />
      )}
      {fileType === 'pdf' && (
        <div>
          <Document file={fileUrl}>
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
      {fileType === 'unknown' && (
        <div>
          <p>Unsupported file type.</p>
        </div>
      )}
    </div>
  );
}

export default MainLayout(ViewFile);
