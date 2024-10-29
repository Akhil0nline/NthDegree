import {expect, test} from '@playwright/test';
import {faker} from '@faker-js/faker'

const orgURL = process.env.DYN365_TEST_ORG_URL ?? '';

test('random_name_generation', async({page}) => {
    await page.goto(orgURL);
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
    console.log(randomFullName);
    console.log(randomEmail);
    
})
