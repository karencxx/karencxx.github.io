document.addEventListener('DOMContentLoaded', function() {
  const tocWrapper = document.querySelector('.toc-wrapper');
  const tocToggle = document.querySelector('.toc-toggle');
  const post = document.querySelector('.post-detail'); // 这里的post是指页面中的文章内容部分
  const tocLinks = document.querySelectorAll('.toc-body a');
  const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3');
  const nav = document.querySelector('.header-container');

  if (!tocWrapper || window.isMobile) return;
  console.log('tocWrapper')
  tocWrapper.classList.add('collapsed');
//   post.classList.add('toc-collapsed');
  localStorage.setItem('tocCollapsed', true);

  // 折叠/展开功能
  tocToggle.addEventListener('click', function() {
    tocWrapper.classList.toggle('collapsed');
    post.classList.toggle('toc-collapsed');
    adjustNavAndToc()
    localStorage.setItem('tocCollapsed', tocWrapper.classList.contains('collapsed'));
  });

  // 恢复折叠状态
  const isCollapsed = localStorage.getItem('tocCollapsed') === 'true';
  if (isCollapsed) {
    tocWrapper.classList.add('collapsed');
    post.classList.add('toc-collapsed');
  }

  // 高亮当前章节
  function highlightTOC() {
    if (tocWrapper.classList.contains('collapsed')) return;

    let scrollPosition = window.pageYOffset;

    for (let i = headings.length - 1; i >= 0; i--) {
      if (scrollPosition >= headings[i].offsetTop - 100) {
        tocLinks.forEach(link => link.classList.remove('active'));
        const relatedLink = tocWrapper.querySelector(`a[href="#${headings[i].id}"]`);
        if (relatedLink) {
          relatedLink.classList.add('active');
          relatedLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        break;
      }
    }
  }

  window.addEventListener('scroll', highlightTOC);

  // 平滑滚动到目标标题
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

 


  function adjustNavAndToc() {
    if (window.scrollY > nav.offsetHeight) {  // 根据需要调整滚动距离
      nav.classList.add('scrolled');
      tocWrapper.style.top = '0';
    } else {
        nav.classList.remove('scrolled');
        tocWrapper.style.top = (nav.offsetHeight - window.scrollY) + 'px';
    }
  }

  window.addEventListener('scroll', adjustNavAndToc);
  adjustNavAndToc();  // 初始调用以设置正确的位置
});
