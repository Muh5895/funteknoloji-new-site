import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Set viewport to a standard desktop size
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # 1. Home Page & Nexy Popup
        print("Checking Home Page...")
        await page.goto("http://localhost:8082/")
        await asyncio.sleep(5) # Wait for intro
        await page.screenshot(path="verify_home.png")

        # Check if Nexy popup is visible
        # The popup has text "Size nasıl yardımcı olabiliriz?" or similar
        await page.screenshot(path="verify_nexy_popup.png")

        # 2. Open Nexy Chat
        print("Opening Nexy Chat...")
        # Try to click the "Yardım" or "Nexy'ye Sor" button
        # In NexyAssistant.tsx, it's a button with "Yardım" text (translated)
        # Or we can trigger the custom event if we can't find it
        await page.evaluate("window.dispatchEvent(new CustomEvent('open-nexy-chat'))")
        await asyncio.sleep(2)
        await page.screenshot(path="verify_chat_open.png")

        # 3. Test Chat Interaction (Table and Scrolling)
        print("Testing Chat Interaction...")
        # Find the textarea
        textarea = page.locator("textarea").first
        await textarea.fill("Lütfen bana meyveler hakkında 3 sütunlu bir tablo oluştur. Sütunlar: İsim, Renk, Kalori.")
        await page.keyboard.press("Enter")

        # Wait for AI response
        await asyncio.sleep(10)
        await page.screenshot(path="verify_chat_response.png")

        # Check for scrolling by sending more messages
        await textarea.fill("Şimdi çok uzun bir metin yaz ki kaydırma çubuğu çıksın. " * 20)
        await page.keyboard.press("Enter")
        await asyncio.sleep(5)
        await page.screenshot(path="verify_chat_scrolling.png")

        # 4. Nexy Page
        print("Checking Nexy Page...")
        await page.goto("http://localhost:8082/nexy")
        await asyncio.sleep(2)
        await page.screenshot(path="verify_nexy_page.png")

        # Test "Sohbet Et" button
        # It should trigger the chat
        sohbet_btn = page.locator("button:has-text('Sohbet Et')").first
        if await sohbet_btn.is_visible():
            await sohbet_btn.click()
            await asyncio.sleep(1)
            await page.screenshot(path="verify_nexy_page_chat_triggered.png")

        # 5. QuakeSafe Page
        print("Checking QuakeSafe Page...")
        await page.goto("http://localhost:8082/quakesafe")
        await asyncio.sleep(2)
        await page.screenshot(path="verify_quakesafe_page.png")

        # 6. Changelog Pages
        print("Checking Changelog Pages...")
        await page.goto("http://localhost:8082/changelog")
        await asyncio.sleep(2)
        await page.screenshot(path="verify_changelog_index.png")

        # Click on a changelog item (e.g., Fun Teknoloji)
        await page.goto("http://localhost:8082/changelog/funteknoloji")
        await asyncio.sleep(2)
        await page.screenshot(path="verify_changelog_detail.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
