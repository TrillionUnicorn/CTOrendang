export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DNs9xr41.js",app:"_app/immutable/entry/app.nopjS-H8.js",imports:["_app/immutable/entry/start.DNs9xr41.js","_app/immutable/chunks/9KXMEHhE.js","_app/immutable/chunks/QTCeCIMS.js","_app/immutable/chunks/0fNMFHk9.js","_app/immutable/chunks/BPFRtMaM.js","_app/immutable/chunks/D_RxU_8Q.js","_app/immutable/entry/app.nopjS-H8.js","_app/immutable/chunks/0fNMFHk9.js","_app/immutable/chunks/BPFRtMaM.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/QTCeCIMS.js","_app/immutable/chunks/D_RxU_8Q.js","_app/immutable/chunks/DKtERFzb.js","_app/immutable/chunks/CV7mcmTS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/health",
				pattern: /^\/health\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/health/_server.ts.js'))
			},
			{
				id: "/pitch",
				pattern: /^\/pitch\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/product",
				pattern: /^\/product\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
