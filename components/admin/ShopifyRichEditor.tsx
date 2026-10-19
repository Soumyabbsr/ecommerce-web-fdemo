"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Quote,
  Code,
  Link as LinkIcon,
  List,
  ListOrdered,
  CheckSquare,
  Table as TableIcon,
  Image as ImageIcon,
  Paperclip,
  ChevronDown,
  Loader2,
} from "lucide-react";

interface ShopifyRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

export function ShopifyRichEditor({
  value,
  onChange,
  placeholder = "Write your detailed product description here...",
  minHeight = "360px",
  onImageUpload,
}: ShopifyRichEditorProps) {
  const [mode, setMode] = useState<"visual" | "markdown">("visual");
  const [isUploading, setIsUploading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  // Floating bubble toolbar state
  const [bubblePos, setBubblePos] = useState<{ x: number; y: number } | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync value into visual contentEditable when mode switches or external value changes drastically
  useEffect(() => {
    if (mode === "visual" && editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      const expectedHtml = markdownToHtml(value || "");
      // Only set if different to avoid cursor jumps
      if (currentHtml !== expectedHtml && editorRef.current !== document.activeElement) {
        editorRef.current.innerHTML = expectedHtml || `<p><br></p>`;
      }
    }
  }, [value, mode]);

  // Handle floating selection bubble
  const handleSelectionChange = useCallback(() => {
    if (mode !== "visual" || !editorRef.current) {
      setBubblePos(null);
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      setBubblePos(null);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!editorRef.current.contains(range.commonAncestorContainer)) {
      setBubblePos(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const top = rect.top - containerRect.top - 46;
      const left = Math.max(10, rect.left - containerRect.left + rect.width / 2 - 140);
      setBubblePos({ x: left, y: Math.max(10, top) });
    }
  }, [mode]);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [handleSelectionChange]);

  // Execute formatting command in Visual Mode
  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (mode === "visual") {
      document.execCommand(command, false, arg);
      if (editorRef.current) {
        const md = htmlToMarkdown(editorRef.current.innerHTML);
        onChange(md);
      }
    } else if (textareaRef.current) {
      // Markdown mode insertions
      applyMarkdownFormatting(command, arg);
    }
  };

  // Markdown mode formatting helpers
  const applyMarkdownFormatting = (type: string, arg?: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;
    const selected = text.slice(start, end);

    const before = text.slice(0, start);
    const after = text.slice(end);
    let replacement = selected;

    switch (type) {
      case "bold":
        replacement = `**${selected || "bold text"}**`;
        break;
      case "italic":
        replacement = `*${selected || "italic text"}*`;
        break;
      case "strikeThrough":
        replacement = `~~${selected || "strikethrough text"}~~`;
        break;
      case "code":
        replacement = selected.includes("\n") ? `\`\`\`\n${selected || "code here"}\n\`\`\`` : `\`${selected || "code"}\``;
        break;
      case "formatBlock":
        if (arg === "h1") replacement = `\n# ${selected || "Heading 1"}\n`;
        else if (arg === "h2") replacement = `\n## ${selected || "Heading 2"}\n`;
        else if (arg === "h3") replacement = `\n### ${selected || "Heading 3"}\n`;
        else if (arg === "blockquote") replacement = `\n> ${selected || "Quote text"}\n`;
        else replacement = selected;
        break;
      case "insertOrderedList":
        replacement = `\n1. ${selected || "List item"}\n2. Second item\n`;
        break;
      case "insertUnorderedList":
        replacement = `\n- ${selected || "Bullet item"}\n- Second item\n`;
        break;
      case "insertChecklist":
        replacement = `\n- [ ] ${selected || "Task item"}\n- [ ] Completed task\n`;
        break;
      case "insertTable":
        replacement = `\n| Item | Specification | Details |\n| :--- | :--- | :--- |\n| Feature 1 | 100% Ayurvedic | Safe for ages 12-35 |\n| Feature 2 | 15 Super Herbs | Ashwagandha & Shatavari |\n`;
        break;
      default:
        break;
    }

    const newValue = before + replacement + after;
    onChange(newValue);

    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start, start + replacement.length);
    }, 10);
  };

  // Direct Image Upload (Cloudinary)
  const handleImageFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      let imageUrl = "";
      if (onImageUpload) {
        imageUrl = await onImageUpload(file);
      } else {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (data.success && data.url) {
          imageUrl = data.url;
        } else {
          alert(data.error || "Failed to upload image to Cloudinary");
          return;
        }
      }

      if (imageUrl) {
        if (mode === "visual") {
          executeCommand("insertImage", imageUrl);
        } else {
          const ta = textareaRef.current;
          if (ta) {
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            const text = ta.value;
            const insertMd = `\n![Product Image](${imageUrl})\n`;
            const newVal = text.slice(0, start) + insertMd + text.slice(end);
            onChange(newVal);
          }
        }
      }
    } catch (err) {
      console.error("Editor image upload error:", err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Text color selection
  const handleSelectColor = (colorHex: string) => {
    if (mode === "visual") {
      document.execCommand("foreColor", false, colorHex);
      if (editorRef.current) {
        onChange(htmlToMarkdown(editorRef.current.innerHTML));
      }
    } else {
      const ta = textareaRef.current;
      if (ta) {
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const text = ta.value;
        const selected = text.slice(start, end) || "colored text";
        const wrapped = `<span style="color: ${colorHex}">${selected}</span>`;
        onChange(text.slice(0, start) + wrapped + text.slice(end));
      }
    }
    setShowColorPicker(false);
  };

  // Link insertion
  const handleInsertLink = () => {
    if (!linkUrl) return;
    const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`;
    if (mode === "visual") {
      executeCommand("createLink", url);
    } else {
      const ta = textareaRef.current;
      if (ta) {
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const text = ta.value;
        const display = linkText || text.slice(start, end) || url;
        const mdLink = `[${display}](${url})`;
        onChange(text.slice(0, start) + mdLink + text.slice(end));
      }
    }
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
  };

  // Keyboard shortcut listener
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      executeCommand("bold");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      executeCommand("italic");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setShowLinkModal(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl border border-gray-300 bg-white shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all flex flex-col overflow-hidden"
    >
      {/* Hidden file input for direct Cloudinary upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFilePicked}
      />

      {/* =========================================================
          TOP TOOLBAR (Matching user's attached screenshot)
      ========================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-gray-200 bg-gray-50/90 px-3 py-2 text-xs select-none">
        {/* Left Toolbar Items */}
        <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 text-gray-700">
          {/* Normal Text / Headings Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowHeadingMenu(!showHeadingMenu);
                setShowColorPicker(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-200/80 font-bold text-gray-800 transition cursor-pointer"
              title="Text Format"
            >
              <span>Normal text</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {showHeadingMenu && (
              <div className="absolute left-0 top-full mt-1 w-44 rounded-xl bg-white border border-gray-200 shadow-xl p-1 z-30 space-y-0.5 animate-in fade-in duration-100">
                <button
                  type="button"
                  onClick={() => {
                    executeCommand("formatBlock", "p");
                    setShowHeadingMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 font-normal text-xs text-gray-800"
                >
                  Normal text
                </button>
                <button
                  type="button"
                  onClick={() => {
                    executeCommand("formatBlock", "h1");
                    setShowHeadingMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 font-black text-sm text-gray-900"
                >
                  Heading 1 (Main)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    executeCommand("formatBlock", "h2");
                    setShowHeadingMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 font-extrabold text-xs text-gray-900"
                >
                  Heading 2 (Section)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    executeCommand("formatBlock", "h3");
                    setShowHeadingMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 font-bold text-xs text-gray-800"
                >
                  Heading 3 (Subsection)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    executeCommand("formatBlock", "blockquote");
                    setShowHeadingMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 italic text-xs text-emerald-800"
                >
                  Quote Block
                </button>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* B: Bold */}
          <button
            type="button"
            onClick={() => executeCommand("bold")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 font-black text-xs text-gray-800 transition cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>

          {/* I: Italic */}
          <button
            type="button"
            onClick={() => executeCommand("italic")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 italic text-xs text-gray-800 transition cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>

          {/* S: Strikethrough */}
          <button
            type="button"
            onClick={() => executeCommand("strikeThrough")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 line-through text-xs text-gray-800 transition cursor-pointer"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          {/* A ▾: Text Color Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowHeadingMenu(false);
              }}
              className="flex items-center gap-0.5 p-1.5 rounded-lg hover:bg-gray-200/80 font-black text-xs text-gray-800 transition cursor-pointer"
              title="Text Color"
            >
              <span className="font-serif underline font-black text-sm leading-none">A</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {showColorPicker && (
              <div className="absolute left-0 top-full mt-1 p-2 bg-white rounded-xl border border-gray-200 shadow-xl grid grid-cols-4 gap-1.5 z-30 animate-in fade-in duration-100">
                {[
                  { label: "Dark Slate", color: "#111827" },
                  { label: "HeightVeda Green", color: "#16341f" },
                  { label: "Emerald Active", color: "#059669" },
                  { label: "Ayurveda Amber", color: "#d97706" },
                  { label: "Crimson Red", color: "#dc2626" },
                  { label: "Royal Blue", color: "#2563eb" },
                  { label: "Deep Purple", color: "#7c3aed" },
                  { label: "Charcoal Muted", color: "#6b7280" },
                ].map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => handleSelectColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className="w-6 h-6 rounded-md hover:scale-110 transition shadow-xs cursor-pointer border border-black/10"
                    title={c.label}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 99: Blockquote */}
          <button
            type="button"
            onClick={() => executeCommand("formatBlock", "blockquote")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 text-gray-800 transition cursor-pointer"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>

          {/* </>: Code Snippet */}
          <button
            type="button"
            onClick={() => executeCommand("code")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 text-gray-800 transition cursor-pointer"
            title="Code Snippet"
          >
            <Code className="w-4 h-4" />
          </button>

          {/* Link Icon */}
          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 text-gray-800 transition cursor-pointer"
            title="Insert Link (Ctrl+K)"
          >
            <LinkIcon className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-gray-300 mx-1" />

          {/* 1. ≡: Numbered list */}
          <button
            type="button"
            onClick={() => executeCommand("insertOrderedList")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 text-gray-800 transition cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          {/* • ≡: Bullet list */}
          <button
            type="button"
            onClick={() => executeCommand("insertUnorderedList")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 text-gray-800 transition cursor-pointer"
            title="Bulleted List"
          >
            <List className="w-4 h-4" />
          </button>

          {/* ☑ ≡: Checklist / Task list */}
          <button
            type="button"
            onClick={() => executeCommand("insertChecklist")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 text-gray-800 transition cursor-pointer"
            title="Checklist / Tasks"
          >
            <CheckSquare className="w-4 h-4" />
          </button>

          {/* Table Icon */}
          <button
            type="button"
            onClick={() => executeCommand("insertTable")}
            className="p-1.5 rounded-lg hover:bg-gray-200/80 text-gray-800 transition cursor-pointer"
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>

          {/* DIRECT CLOUDINARY IMAGE UPLOAD */}
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-800 transition cursor-pointer relative"
            title="Upload Image directly to Cloudinary"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Right Toolbar: Visual vs Markdown Segmented Pill */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-0.5 rounded-xl bg-gray-200/90 border border-gray-300/80 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                if (mode !== "visual") {
                  setMode("visual");
                }
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                mode === "visual"
                  ? "bg-white text-emerald-950 font-black shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Visual
            </button>
            <button
              type="button"
              onClick={() => {
                if (mode !== "markdown") {
                  if (editorRef.current) {
                    onChange(htmlToMarkdown(editorRef.current.innerHTML));
                  }
                  setMode("markdown");
                }
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                mode === "markdown"
                  ? "bg-white text-emerald-950 font-black shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Markdown
            </button>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-200/80 transition"
            title="Attach Media"
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================================================
          FLOATING BUBBLE TOOLBAR (When text is highlighted)
      ========================================================= */}
      {bubblePos && mode === "visual" && (
        <div
          style={{ top: `${bubblePos.y}px`, left: `${bubblePos.x}px` }}
          className="absolute z-40 flex items-center gap-1 rounded-xl bg-white/95 backdrop-blur-md px-2 py-1 shadow-2xl border border-gray-200/90 text-gray-700 animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("bold");
            }}
            onMouseEnter={() => setActiveTooltip("Bold (Ctrl+B)")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-1 rounded hover:bg-gray-100 font-black"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("italic");
            }}
            onMouseEnter={() => setActiveTooltip("Italic (Ctrl+I)")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-1 rounded hover:bg-gray-100 italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("strikeThrough");
            }}
            onMouseEnter={() => setActiveTooltip("Strikethrough")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-1 rounded hover:bg-gray-100 line-through"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <div className="h-3 w-px bg-gray-200" />
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("formatBlock", "blockquote");
            }}
            onMouseEnter={() => setActiveTooltip("Quote")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              executeCommand("code");
            }}
            onMouseEnter={() => setActiveTooltip("Code")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowLinkModal(true);
            }}
            onMouseEnter={() => setActiveTooltip("Link")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          {/* Active tooltip popover */}
          {activeTooltip && (
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-[10px] font-bold py-0.5 px-2 rounded-md shadow-md">
              {activeTooltip}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          LINK MODAL
      ========================================================= */}
      {showLinkModal && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 shadow-2xl border border-gray-200 w-full max-w-sm space-y-3">
            <h4 className="font-black text-sm text-gray-900">Insert Link</h4>
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1">Link URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-600 outline-none"
              />
            </div>
            {mode === "markdown" && (
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">Text to display</label>
                <input
                  type="text"
                  placeholder="Optional title"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>
            )}
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#16341f] text-white hover:bg-emerald-900"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          EDITOR CANVAS
      ========================================================= */}
      <div className="relative p-4 flex-1">
        {mode === "visual" ? (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => {
              if (editorRef.current) {
                const md = htmlToMarkdown(editorRef.current.innerHTML);
                onChange(md);
              }
            }}
            onKeyDown={handleKeyDown}
            style={{ minHeight }}
            data-placeholder={placeholder}
            className="prose prose-sm sm:prose max-w-none focus:outline-none min-h-[360px] text-gray-800 leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full resize-y font-mono text-xs sm:text-sm text-gray-800 p-2 focus:outline-none leading-relaxed bg-transparent"
          />
        )}
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-2 text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{value ? value.split(/\s+/).filter(Boolean).length : 0} words</span>
          <span>•</span>
          <span>{value ? value.length : 0} characters</span>
          {isUploading && (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Uploading to Cloudinary...
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <span>Shopify Rich Editor</span>
          <span className="text-emerald-700 font-black">●</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MARKDOWN <-> HTML PARSERS
========================================================= */

function markdownToHtml(markdown: string): string {
  if (!markdown) return "<p><br></p>";

  const lines = markdown.split("\n");
  const htmlParts: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      htmlParts.push("<p><br></p>");
      continue;
    }

    if (trimmed.startsWith("# ")) {
      htmlParts.push(`<h1>${formatInline(trimmed.slice(2))}</h1>`);
    } else if (trimmed.startsWith("## ")) {
      htmlParts.push(`<h2>${formatInline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      htmlParts.push(`<h3>${formatInline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("> ")) {
      htmlParts.push(`<blockquote>${formatInline(trimmed.slice(2))}</blockquote>`);
    } else if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("- [x] ")) {
      const checked = trimmed.startsWith("- [x] ");
      const text = trimmed.slice(6);
      htmlParts.push(
        `<div class="checklist-item" style="display:flex;align-items:center;gap:6px;margin:3px 0;">
          <input type="checkbox" ${checked ? "checked" : ""} disabled style="accent-color:#16341f;" />
          <span>${formatInline(text)}</span>
        </div>`
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      htmlParts.push(`<ol><li>${formatInline(trimmed.replace(/^\d+\.\s/, ""))}</li></ol>`);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      htmlParts.push(`<ul><li>${formatInline(trimmed.slice(2))}</li></ul>`);
    } else if (trimmed.startsWith("![") && trimmed.includes("](") && trimmed.endsWith(")")) {
      const imgMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        htmlParts.push(
          `<p><img src="${imgMatch[2]}" alt="${imgMatch[1]}" style="max-height:320px;border-radius:12px;margin:8px 0;" /></p>`
        );
      } else {
        htmlParts.push(`<p>${formatInline(trimmed)}</p>`);
      }
    } else {
      htmlParts.push(`<p>${formatInline(trimmed)}</p>`);
    }
  }

  return htmlParts.join("");
}

function formatInline(text: string): string {
  const res = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/~~(.*?)~~/g, "<del>$1</del>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return res;
}

function htmlToMarkdown(html: string): string {
  if (!html) return "";

  // Convert basic HTML structures to Markdown
  let md = html
    .replace(/<h1>(.*?)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2>(.*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3>(.*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<h4>(.*?)<\/h4>/gi, "\n#### $1\n")
    .replace(/<blockquote>(.*?)<\/blockquote>/gi, "\n> $1\n")
    .replace(/<ol>([\s\S]*?)<\/ol>/gi, (_, content) => {
      let idx = 1;
      return "\n" + content.replace(/<li>(.*?)<\/li>/gi, () => `${idx++}. $1\n`) + "\n";
    })
    .replace(/<ul>([\s\S]*?)<\/ul>/gi, (_, content) => {
      return "\n" + content.replace(/<li>(.*?)<\/li>/gi, "- $1\n") + "\n";
    })
    .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i>(.*?)<\/i>/gi, "*$1*")
    .replace(/<del>(.*?)<\/del>/gi, "~~$1~~")
    .replace(/<s>(.*?)<\/s>/gi, "~~$1~~")
    .replace(/<code>(.*?)<\/code>/gi, "`$1`")
    .replace(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, "\n![$2]($1)\n")
    .replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, "\n![]($1)\n")
    .replace(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<p><br><\/p>/gi, "\n")
    .replace(/<p>(.*?)<\/p>/gi, "$1\n")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

  // Clean extra blank lines
  md = md.replace(/\n{3,}/g, "\n\n").trim();
  return md;
}
