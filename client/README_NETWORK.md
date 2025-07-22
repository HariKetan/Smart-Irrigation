# Network Auto-Detection for Irrigation System

## How It Works

The application now automatically detects the server URL based on your current network, so you can access it from any network without configuration changes.

### Auto-Detection Logic

1. **Environment Variable Priority**: If `NEXT_PUBLIC_API_BASE_URL` is set in `.env.local`, it will be used
2. **Auto-Detection**: If no environment variable is set, the app automatically uses the current hostname + port 3001

### Examples

- **Local Development**: `http://localhost:3001`
- **Same Network (Desktop)**: `http://192.168.1.150:3001`
- **Same Network (Mobile)**: `http://192.168.1.150:3001`
- **Different Network**: `http://[new-ip]:3001`

### How to Use

1. **Start your server** on port 3001:
   ```bash
   cd ../server
   npm run dev
   ```

2. **Start your client**:
   ```bash
   npm run dev
   ```

3. **Access from any device** on the same network using your computer's IP address:
   - Desktop: `http://localhost:3000`
   - Mobile: `http://[your-computer-ip]:3000`

### Troubleshooting

1. **Check Console Logs**: Open browser dev tools to see the auto-detected URL
2. **Verify Server**: Make sure your server is running on port 3001
3. **Network Access**: Ensure both devices are on the same network
4. **Firewall**: Check if your firewall allows connections on port 3001

### Manual Override

If you need to use a specific server URL, add it to `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://your-custom-url:3001
```

### Components Updated

- ✅ LoginPage
- ✅ Registration
- ✅ AuthContext
- ✅ DataDisplay
- ✅ All API calls now use centralized utility 