// ===========================================
// app/api/export/route.js
// ===========================================
export async function POST(request) {
  try {
    const { proposal, format, filename } = await request.json();
    
    let contentType;
    let content;
    
    switch (format) {
      case 'txt':
        contentType = 'text/plain';
        content = proposal;
        break;
      case 'docx':
        // For DOCX, you'd need a library like docx
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        content = proposal; // Simplified for now
        break;
      default:
        contentType = 'text/plain';
        content = proposal;
    }
    
    return new Response(content, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename || 'proposal'}.${format}"`
      }
    });
  } catch (error) {
    return Response.json({ error: 'Export failed' }, { status: 500 });
  }
}
