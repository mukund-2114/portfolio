---
description: How to create a new blog post
---

Follow these steps to create a new blog post in the portfolio:

1. **Open the Data File**: Open `src/Components/Blog/blogData.js`. This file contains the array of all blog posts.

2. **Add a New Object**: Append a new object to the `blogs` array. The object should have the following structure:

```javascript
{
  id: 3, // Ensure this is a unique number, typically incremented from the last blog
  title: "Your Engaging Blog Title Here",
  summary: "A brief 1-2 sentence summary of what the blog is about.",
  date: "Month DD, YYYY", // e.g., "April 10, 2026"
  readTime: "5 min read",
  thumbnail: "/blog3/thumbnail.jpg", // Create this folder in the `public` directory and add your image
  tags: ["Tag1", "Tag2", "Tag3"], // Try to stick to 3 relevant tags
  content: [
    // Content blocks go here. See Step 3 for the format.
  ]
}
```

3. **Construct the Content**: The `content` array is a list of blocks that define the layout. You can use the following types of blocks:
   - **Paragraph**: Standard text block. Supports inline formatting: `**bold**`, `*italic*`, `==highlight==`, and `` `code` ``.
     ```javascript
     { type: 'paragraph', text: 'Your text goes here.' }
     ```
   - **Heading / Subheading**: For organizing content.
     ```javascript
     { type: 'heading', text: 'Main Section Title' }
     { type: 'subheading', text: 'Subsection Title' }
     ```
   - **Image**: An image with an optional caption. Ensure images are placed in the `public/` folder.
     ```javascript
     { type: 'image', src: '/blogX/image.png', caption: 'Description of the image' }
     ```
   - **Callout**: An emphasized text box, great for important notes or takeaways.
     ```javascript
     { type: 'callout', text: 'This represents an important concept or rule.' }
     ```
   - **Internal Link (Optional)**: If the blog belongs to a multi-part series, use this to link backward or forward. Use `direction: 'left'` for previous (Part 1, goes at top), and `direction: 'right'` for next (Part 2, goes at bottom).
     ```javascript
     { type: 'internalLink', direction: 'left', label: 'Part X', title: 'Previous Blog Title', link: '/blog/X' }
     ```

4. **Add Media Assets**: Ensure any images referenced in the `thumbnail` and `src` fields are added to the `public/` directory, preferably inside a dedicated folder like `public/blogX/`.

5. **Cross-Link Articles (if applicable)**: If you linked this new blog from an older blog (e.g. Part 1 linking to Part 2), remember to also update the older blog's `content` array to include an `internalLink` block pointing to the new one!
