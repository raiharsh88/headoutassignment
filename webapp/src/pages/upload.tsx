import React, { useState, useRef } from 'react';
import Webcam, { WebcamProps } from 'react-webcam';
import '../css/base.css';
import { JsxElement, JsxEmit } from 'typescript';

type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};
const NewWeb = Webcam as unknown as React.JSXElementConstructor<MakeOptional<WebcamProps>>


function Upload() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImageSrc(imageSrc);

        console.log('Image src', imageSrc)
      } else {
        alert('Failed to capture image. Please ensure camera access is granted.');
      }
    }
  };
console.log('Hello')
  const sendImageToBackend = async () => {
    if (imageSrc) {
      try {
        // Replace with actual backend API endpoint
        const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageSrc }),
        });
        if (response.ok) {
          alert('Image sent successfully!');
          setImageSrc(null); // Reset image after successful upload
        } else {
          alert('Failed to send image to backend.');
        }
      } catch (error) {
        console.error('Error sending image:', error);
        alert('Error sending image to backend.');
      }
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Capture App</h1>
{!imageSrc&&<NewWeb
        mirrored={true}
          audio={false}
          ref={webcamRef as unknown as any}
          
          screenshotFormat="image/png"
          videoConstraints={{ facingMode: 'user' }}
          onUserMediaError={(error: unknown) => {
            console.error('Error accessing camera:', error);
            alert('Camera access denied. Please grant permission to use the camera.');
          }}
        />}
        <button onClick={captureImage}>Capture Imagee</button>
        {imageSrc && (
          <>
            <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%', marginTop: '20px' }} />
            <button onClick={sendImageToBackend}>Confirm and Send</button>
            <button onClick={() => setImageSrc(null)}>Discard</button>
          </>
        )}
      </header>
    </div>
  );
}

export default Upload;
