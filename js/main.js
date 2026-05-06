/**
 * 软曲守门技术 — 交互逻辑
 */

document.addEventListener('DOMContentLoaded', () => {

  // 导航栏滚动效果
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 卡片点击涟漪效果
  document.querySelectorAll('.card, .content-item, .video-card').forEach(el => {
    el.addEventListener('click', function (e) {
      // 只在有链接父元素时处理，或者作为独立点击目标
      const anchor = this.closest('a');
      if (!anchor) return;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 20px; height: 20px;
        background: rgba(139, 168, 136, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        left: ${e.clientX - this.getBoundingClientRect().left - 10}px;
        top: ${e.clientY - this.getBoundingClientRect().top - 10}px;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // 注入涟漪动画关键帧
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to { transform: scale(30); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

});
