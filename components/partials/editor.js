/* eslint-disable global-require */
import { useEffect, useRef, useState } from 'react';

const Editor = ({ placeholder, data, onChange }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      config={{
        placeholder: placeholder || 'Write your comment here!',
        toolbar: ['bold', 'italic'],
      }}
      data={data}
      onReady={(editor) => {
        // You can store the 'editor' and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const _data = editor.getData();
        if (onChange) {
          onChange(_data);
        }
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  ) : (
    <div>Editor loading</div>
  );
};

export default Editor;
