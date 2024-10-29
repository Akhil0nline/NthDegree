
async function login(
  page : any,
  baseURL: any,
  username: any,
  password: any,
  orgURL: any,

){
   
    console.log('Global Setup has been started')
    await page.goto(baseURL);
    await page.click("input[type='submit']");
    await page.fill("input[type='email']", username);
    await page.click("input[type='submit']");
    await page.fill("input[type='password']", password);
    await page.click("input[type='submit']");
    //await page.locator('button:has-text("Yes")').click();
    await page.goto(orgURL);
  //   await Promise.all([
  //   page.waitForNavigation(),
  //   await page.getByRole('button', { name: 'Sign in' }).click(),
  //   await page.getByRole('button', { name: 'Yes' }).click(),
  // ]);
    console.log('Global setup is over')
}
export default login;

