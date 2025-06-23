document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            message.textContent = 'Please select a file.';
            message.className = 'mt-4 text-center text-red-500';
            return;
        }

        if (file.name !== 'data.json') {
            message.textContent = 'Please select a file named data.json.';
            message.className = 'mt-4 text-center text-red-500';
            return;
        }

        try {
            // First, get the presigned URL
            const presignedUrlResponse = await fetch('/api/get-upload-url');
            const { url, fields } = await presignedUrlResponse.json();

            // Prepare the form data for upload
            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value);
            });
            formData.append('file', file);

            // Upload to Vercel Blob
            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                message.textContent = 'File uploaded successfully!';
                message.className = 'mt-4 text-center text-green-500';
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            message.textContent = 'Error uploading file. Please try again.';
            message.className = 'mt-4 text-center text-red-500';
            console.error('Upload error:', error);
        }
    });
});