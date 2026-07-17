"use client";
import { useState, useEffect } from 'react';
import { User, Phone, Mail, Shield } from 'lucide-react';
import { getAllUsers } from '../../lib/api';

const ROLE_STYLE = { admin:'bg-slate-100 text-black', b2b:'bg-slate-100 text-black', user:'bg-slate-100 text-black' };

export default function UsersTab() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllUsers();
        if (res.success) setUsers(res.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-lg font-black text-slate-900">Users ({users.length})</h2>
        <input className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none w-56" placeholder="Search by name or email..." value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center py-10 text-slate-400">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center py-10 text-slate-400">No users found.</p>
        ) : (
          filteredUsers.map(u=>(
            <div key={u.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-black flex items-center justify-center font-black text-sm">{u.name?.charAt(0) || '?'}</div>
                <div>
                  <p className="font-bold text-sm text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-2"><Mail size={10}/>{u.email}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-2"><Phone size={10}/>{u.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${ROLE_STYLE[u.role]||'bg-slate-100 text-slate-600'}`}>{u.role}</span>
                <div className="text-xs text-slate-500 text-right">
                  <p className="font-bold text-slate-700">{u.orders} orders</p>
                  <p>Joined {u.joined}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
