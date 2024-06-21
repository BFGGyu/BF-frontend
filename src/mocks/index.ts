async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');

    // 노드 환경에서 사용하는 Mock Server 옵션 추가
    server.listen();
  } else {
    const { worker } = await import('./browser');

    // Service Worker Mocking 옵션 추가
    worker.start({
      onUnhandledRequest: 'bypass'
    });
  }
}

export { initMSW };
