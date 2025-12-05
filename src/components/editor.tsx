"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { useCallback } from "react"
import { Bold, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Undo, Link as LinkIcon, Image as ImageIcon, ImagePlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorProps {
    content: string
    onChange: (content: string) => void
    editable?: boolean
}

export function Editor({ content, onChange, editable = true }: EditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: "Write something amazing...",
            }),
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-2",
            },
        },
    })

    const addImage = useCallback(() => {
        const url = window.prompt("Enter image URL")
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    const uploadImage = useCallback(async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                const data = await response.json()
                if (editor) {
                    editor.chain().focus().setImage({ src: data.url }).run()
                }
            } else {
                console.error("Failed to upload image")
            }
        } catch (error) {
            console.error("Error uploading image:", error)
        }
    }, [editor])

    const handleImageUpload = useCallback(() => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0]
            if (file) {
                await uploadImage(file)
            }
        }
        input.click()
    }, [uploadImage])

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-md bg-background">
            {editable && (
                <div className="flex flex-wrap gap-1 border-b p-2 bg-muted/50">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={cn("p-2 rounded hover:bg-muted", editor.isActive("bold") && "bg-muted text-primary")}
                        type="button"
                    >
                        <Bold className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={cn("p-2 rounded hover:bg-muted", editor.isActive("italic") && "bg-muted text-primary")}
                        type="button"
                    >
                        <Italic className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        className={cn("p-2 rounded hover:bg-muted", editor.isActive("strike") && "bg-muted text-primary")}
                        type="button"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </button>
                    <div className="w-px h-6 bg-border mx-1 self-center" />
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn("p-2 rounded hover:bg-muted", editor.isActive("bulletList") && "bg-muted text-primary")}
                        type="button"
                    >
                        <List className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn("p-2 rounded hover:bg-muted", editor.isActive("orderedList") && "bg-muted text-primary")}
                        type="button"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={cn("p-2 rounded hover:bg-muted", editor.isActive("blockquote") && "bg-muted text-primary")}
                        type="button"
                    >
                        <Quote className="h-4 w-4" />
                    </button>
                    <div className="w-px h-6 bg-border mx-1 self-center" />
                    <button
                        onClick={handleImageUpload}
                        className="p-2 rounded hover:bg-muted"
                        type="button"
                    >
                        <ImageIcon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={addImage}
                        className="p-2 rounded hover:bg-muted"
                        type="button"
                        title="Insert Image by URL"
                    >
                        <ImagePlus className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => {
                            const previousUrl = editor.getAttributes('link').href
                            const url = window.prompt('URL', previousUrl)
                            if (url === null) return
                            if (url === '') {
                                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                                return
                            }
                            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
                        }}
                        className={cn("p-2 rounded hover:bg-muted", editor.isActive("link") && "bg-muted text-primary")}
                        type="button"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </button>
                    <div className="w-px h-6 bg-border mx-1 self-center" />
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        className="p-2 rounded hover:bg-muted disabled:opacity-50"
                        type="button"
                    >
                        <Undo className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        className="p-2 rounded hover:bg-muted disabled:opacity-50"
                        type="button"
                    >
                        <Redo className="h-4 w-4" />
                    </button>
                </div>
            )}
            <EditorContent editor={editor} />
        </div>
    )
}
