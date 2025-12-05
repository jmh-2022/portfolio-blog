'use client';

import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    ClassicEditor,
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    HorizontalLine,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    Paragraph,
    SelectAll,
    SimpleUploadAdapter,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Undo,
    EditorConfig,
    FileLoader,
    Editor,
    UploadResponse,
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ko.js';

import 'ckeditor5/ckeditor5.css';

// import './App.css'; // We'll handle styles globally or via Tailwind

const editorConfig: EditorConfig = {
    licenseKey: 'GPL',
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            'findAndReplace',
            'selectAll',
            '|',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            '|',
            'horizontalLine',
            'link',
            'insertImage',
            'blockQuote',
            '|',
            'alignment',
            '|',
            'outdent',
            'indent',
            '|',
            'accessibilityHelp',
        ],
        shouldNotGroupWhenFull: true,
    },

    plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BlockQuote,
        Bold,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontSize,
        HorizontalLine,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        Paragraph,
        SelectAll,
        SimpleUploadAdapter,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        Undo,
    ],
    fontFamily: {
        supportAllValues: true,
    },
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
    },
    image: {
        toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
        ],
    },
    initialData: '',
    language: 'ko',
    placeholder: '내용을 입력하세요...',
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
        ],
    },
    translations: [translations],
};

type CustomEditorProps = {
    handleChangeEditorData?: (editorData: string) => void;
    content?: string;
};

export default function CustomEditor({
    handleChangeEditorData,
    content,
}: CustomEditorProps) {
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    const customUploadAdapter = (loader: FileLoader) => {
        return {
            upload(): Promise<UploadResponse> {
                return new Promise((resolve, reject) => {
                    loader.file.then(async (file) => {
                        if (file) {
                            const formData = new FormData();
                            formData.append('file', file);

                            try {
                                const response = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData,
                                });

                                if (response.ok) {
                                    const data = await response.json();
                                    resolve({
                                        default: data.url,
                                    });
                                } else {
                                    reject('Upload failed');
                                }
                            } catch (error) {
                                reject(error);
                            }
                        }
                    });
                });
            },
        };
    };

    function uploadPlugin(editor: Editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const config = {
        ...editorConfig,
        extraPlugins: [uploadPlugin],
    };

    return (
        isLayoutReady && (
            <div className="ck-editor-container text-black">
                <style>{`
          .ck-editor__editable {
            min-height: 500px;
            max-height: 700px;
            overflow-y: auto;
          }
          .ck-content {
            font-family: 'Spoqa Han Sans Neo', sans-serif;
            line-height: 1.6;
            word-break: break-word;
            min-height: 500px;
          }
        `}</style>
                <CKEditor
                    editor={ClassicEditor}
                    config={config}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handleChangeEditorData && handleChangeEditorData(data);
                    }}
                    data={content}
                />
            </div>
        )
    );
}
