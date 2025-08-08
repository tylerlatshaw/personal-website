export default function SupabaseCommands() {

  return <div className="developer-module w-full">
    <h2>Supabase CLI Commands</h2>
    
    <table className="w-full">
      <thead>
        <tr>
          <th>Command</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>npm update supabase --save-dev</code></td>
          <td>Update CLI</td>
        </tr>
        <tr>
          <td><code>npx supabase gen types typescript --project-id &quot;DATABASE_ID&quot; --schema public &gt; database.types.ts</code></td>
          <td>Regenerates database types file</td>
        </tr>
        <tr>
          <td><code>npx supabase --help</code></td>
          <td>Launches help commands</td>
        </tr>
      </tbody>
    </table>
  </div>;
}
