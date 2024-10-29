import { expect} from "@playwright/test";
import { Page } from "@playwright/test";
//import {  CommandBarGlobalButtonsSelectors, FormSelectors} from "./page_objects/commonPages.json";

/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/

export async function clickElementOrFrame(page: Page, text: string, frameTitle: string) {
    try {
        // Wait until the specified text is loaded and visible
        await page.getByText(text).first().waitFor({ state: 'visible', timeout: 5000 });
        // Click the element if it's visible
        await page.getByText(text).first().click();
    } catch (error) {
        console.log(`The '${text}' button is not visible, proceeding to the frame.`);
        // If not visible, interact with the specified frame
        const frame = page.frameLocator(`[title="${frameTitle}"]`);
        await frame.getByText('Populate Opportunity Products').click();
    }
}

export const stringFormat = (str, ...args) =>
   str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");

// export async function waitUntilAppIdle(page) {
//    // eslint-disable-next-line no-restricted-syntax
//    try {
//       await page.waitForFunction(() => (window).UCWorkBlockTracker?.isAppIdle());
//    } catch (e) {
//       console.log("waitUntilIdle failed, ignoring.., error: " + e?.message);
//    }
// }

export const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, (seconds || 1) * 1000));

/**
 * Load state conditions.
 */
export let LoadState;(function(LoadState) 
{
  LoadState["DomContentLoaded"] = "domcontentloaded"
  LoadState["Load"] = "load"
  LoadState["NetworkIdle"] = "networkidle"
})
(LoadState || (LoadState = {}));



/**
 * Wait for dom-content load.
 * @param page Page reference.
 * @param loadTimeout Page load timeout. Default - 1 minute.
 */
export async function waitForDomContentLoad
    (
	page,
	loadTimeout= TimeOut.NavigationTimeout
    ) 
    {
	await page.waitForLoadState(LoadState.DomContentLoaded, { timeout: loadTimeout });
    }


/**
 * Timeout for multiple scenarios.
 */
export let TimeOut;(function(TimeOut) 
    {
  TimeOut[(TimeOut["DefaultLoopWaitTime"] = 5000)] = "DefaultLoopWaitTime"
  TimeOut[(TimeOut["DefaultWaitTime"] = 30000)] = "DefaultWaitTime"
  TimeOut[(TimeOut["DefaultMaxWaitTime"] = 180000)] = "DefaultMaxWaitTime"
  TimeOut[(TimeOut["DefaultWaitTimeForValidation"] = 30000)] = "DefaultWaitTimeForValidation"
  TimeOut[(TimeOut["ElementWaitTime"] = 2000)] = "ElementWaitTime"
  TimeOut[(TimeOut["ExpectRetryDefaultWaitTime"] = 30000)] = "ExpectRetryDefaultWaitTime"
  TimeOut[(TimeOut["LoadTimeOut"] = 60000)] = "LoadTimeOut"
  TimeOut[(TimeOut["NavigationTimeout"] = 60000)] = "NavigationTimeout"
  TimeOut[(TimeOut["PageLoadTimeOut"] = 30000)] = "PageLoadTimeOut"
  TimeOut[(TimeOut["TestTimeout"] = 360000)] = "TestTimeout"
  TimeOut[(TimeOut["TestTimeoutMax"] = 6000000)] = "TestTimeoutMax"
  TimeOut[(TimeOut["OneMinuteTimeOut"] = 60000)] = "OneMinuteTimeOut"
  TimeOut[(TimeOut["TwoMinutesTimeout"] = 120000)] = "TwoMinutesTimeout"
  TimeOut[(TimeOut["ThreeMinutesTimeout"] = 180000)] = "ThreeMinutesTimeout"
  TimeOut[(TimeOut["FourMinutesTimeout"] = 240000)] = "FourMinutesTimeout"
  TimeOut[(TimeOut["FiveMinutesTimeout"] = 300000)] = "FiveMinutesTimeout"
    })
        (
            TimeOut || (TimeOut = {})
        );



