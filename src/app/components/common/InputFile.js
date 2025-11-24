import Image from 'next/image';

const InputFile = ({ 
  label = "", 
  name = "", 
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = "2MB",
  filePreview,
  fileName,
  fileInputRef,
  handleFileChange,
  clearFile
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      
      <div className="flex items-center justify-center w-full">
        <label htmlFor={name} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Klik untuk upload</span> atau drag and drop
            </p>
            <p className="text-xs text-gray-500">PDF, JPG, atau PNG (Maks. {maxSize})</p>
          </div>
          <input 
            id={name} 
            ref={fileInputRef}
            type="file" 
            name={name} 
            onChange={handleFileChange} 
            className="hidden" 
            accept={accept}
          />
        </label>
      </div>
      
      {/* File Preview Section */}
      {filePreview && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between p-3">
            <span className="text-sm font-medium text-gray-700">{fileName}</span>
            <button 
              type="button"
              onClick={clearFile}
              className="text-red-500 hover:text-red-700 text-sm"
              style={{ marginLeft: "auto" }}
            >
              Hapus
            </button>
          </div>
          
          <div className="flex justify-center">
            {filePreview === 'pdf' ? (
              <div className="flex items-center justify-center p-4">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-2 text-sm text-gray-500">PDF dokumen</span>
              </div>
            ) : filePreview === 'file' ? (
              <div className="flex items-center justify-center p-4">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-2 text-sm text-gray-500">File dokumen</span>
              </div>
            ) : (
              <div className="flex justify-center items-center h-60 w-full">
                <Image 
                  src={filePreview}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="max-h-full max-w-full object-contain rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InputFile;