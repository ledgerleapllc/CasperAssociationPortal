/* eslint-disable global-require */
import { useEffect, useRef, useState } from 'react';

const Editor = ({ placeholder, onChange, value }) => {
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
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (onChange)
          onChange(data);
      }}
    />
  ) : (
    <div>Editor loading</div>
  );
};

export default Editor;
