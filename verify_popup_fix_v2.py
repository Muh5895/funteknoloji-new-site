import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 720})
        page = await context.new_page()
        try:
            # Increase timeout and wait for network idle
            await page.goto("http://localhost:8082", wait_until="networkidle", timeout=60000)
            # Wait for the popup to be visible if it is
            await page.wait_for_timeout(3000)

            # Check if popup text is there
            popup_text = await page.query_selector("text='How can we help you?'")
            if popup_text:
                print("Popup text found.")
            else:
                # Try Turkish as well
                popup_text = await page.query_selector("text='Nasıl yardımcı olabiliriz?'")
                if popup_text:
                    print("Turkish popup text found.")

            await page.screenshot(path="verify_popup_fix_v2.png", full_page=False)
            print("Screenshot saved to verify_popup_fix_v2.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
