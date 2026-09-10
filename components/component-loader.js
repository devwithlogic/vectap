/**
 * VECTA: Client-Side Component Template Loader
 * Asynchronously mounts HTML component templates into data-component containers
 */

window.loadComponents = async function() {
  const elements = document.querySelectorAll('[data-component]');
  
  const loadPromises = Array.from(elements).map(async (el) => {
    const componentName = el.getAttribute('data-component');
    try {
      const response = await fetch(`components/${componentName}.html`);
      if (response.ok) {
        el.innerHTML = await response.text();
      } else {
        console.error(`Failed to load component: ${componentName}`);
      }
    } catch (err) {
      console.error(`Error loading component ${componentName}:`, err);
    }
  });

  await Promise.all(loadPromises);
};
