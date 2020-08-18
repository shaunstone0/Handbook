import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import ImageUploader from 'quill-image-uploader';

Quill.register('modules/imageUploader', ImageUploader);

class Editor extends Component {
  modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ['link', 'image'],
      ['blockquote'],
      ['clean'], // remove formatting button
    ],

    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('image', file);

          fetch(
            'https://api.imgbb.com/1/upload?key=26e56761bf3f82bf6a0b4a35d6cce3d3',
            {
              method: 'POST',
              body: formData,
            }
          )
            .then((response) => response.json())
            .then((result) => {
              resolve(result.data.url);
            })
            .catch((error) => {
              reject('Upload failed');
              console.error('Error:', error);
            });
        });
      },
    },
  };

  render() {
    return (
      <div>
        <ReactQuill
          theme='snow'
          modules={this.modules}
          onChange={this.props.handleEditorChange}
          className={this.props.errors ? 'danger' : ''}
        />
      </div>
    );
  }
}

export default Editor;
