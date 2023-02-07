import NetworkSpeed from 'network-speed'; // ES6
const testNetworkSpeed = new NetworkSpeed();

getNetworkDownloadSpeed();

async function getNetworkDownloadSpeed() {
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
    const fileSizeInBytes = 500000;
    try {

        return testNetworkSpeed?.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    } catch (e) {
        return '';
    }
}


export async function getConnectionSpeed() {
    try {
        const speed = await getNetworkDownloadSpeed();
        return speed?.bps;
    }
    catch (err) {
        return ''
    }
}