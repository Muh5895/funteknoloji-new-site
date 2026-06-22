import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            await page.goto("http://localhost:8082", timeout=60000)
            await page.wait_for_timeout(2000)
            # Take screenshot of the popup without image
            await page.screenshot(path="verify_popup_fix.png")
            print("Screenshot saved to verify_popup_fix.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
