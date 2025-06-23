module.exports = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/upload',
            },
        ];
    },
    // Add this to handle HTML files
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'html'],
}; 