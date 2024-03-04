"use client"

import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import CheckList from '@editorjs/checklist';
import SimpleImage from '@editorjs/simple-image';
import Link from '@editorjs/link';
import Quote from '@editorjs/quote';
import Paragraph from "@editorjs/paragraph";

const documentData = {
    "time": 1550476186479,
    "blocks": [
        {
            "id": "oUq2g_tl8y",
            "type": "header",
            "data": {
                "text": "IdeaInk - Your Digital Ideation Canvas",
                "level": 2
            }
        },
        {
            "id": "zbGZFPM-iI",
            "type": "paragraph",
            "data": {
                "text": "Sketch, brainstorm, collaborate. Turn inspiration into action!"
            }
        },
        {
            "id": "qYIGsjS5rt",
            "type": "header",
            "data": {
                "text": "Tech Stack",
                "level": 4
            }
        },
        {
            "id": "XV87kJS_H1",
            "type": "list",
            "data": {
                "style": "unordered",
                "items": [
                    "Next.js + TypeScript",
                    "Convex",
                    "Editor.js"
                ]
            }
        }
    ],
    "version": "2.8.1"
}

function Document() {
    const editorRef = useRef<EditorJS>();
    const [document, setDocument] = useState(documentData);

    const initializeEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs', 
            placeholder: 'Let`s write an awesome story!',
            tools: { 
                header: Header, 
                list: List,
                checklist: CheckList,
                image: SimpleImage,
                link: Link,
                quote: Quote,
                paragraph: Paragraph,
            }, 
            data: document
        });
        editorRef.current = editor
    }

    useEffect(() => {
        initializeEditor();
    },[]);

    return (
        <div>
            <div id="editorjs">
            </div>
        </div>
    )
}

export default Document
