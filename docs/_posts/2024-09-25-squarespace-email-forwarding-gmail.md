---
title: "How To Send and Receive Emails From a Squarespace Forwarding Alias Using Gmail"
excerpt: "Learn how to set up Gmail to send and receive emails using a Squarespace forwarding alias."
last_modified_at: 2026-08-13T20:14:57
toc: true
toc_label: "On This Page"
toc_sticky: true
header:
  teaser: /assets/images/misc/squarespace-and-gmail.png
categories:
  - blog
tags:
  - miscellaneous
---


## Some Background

In 2023, [Squarespace acquired Google Domains](https://support.squarespace.com/hc/en-us/articles/17131164996365-About-the-Google-Domains-migration-to-Squarespace), which meant that anyone with a domain purchased through Google, me among them, was now a Squarespace customer. One great feature of Squarespace is the ability to create an email alias for any domain you own. While this alias doesn't have its own inbox, you could use Gmail to send and receive emails from it via [forwarding](https://support.squarespace.com/hc/en-us/articles/19000909092237-Email-forwarding-with-a-Squarespace-domain).

This functionality is still available, but the migration from Google Domains to Squarespace [messed up some stuff behind the scenes](https://forum.squarespace.com/topic/297984-issue-with-email-forwarding-after-google-domain-migration/page/2/). I recently had to reconfigure everything to ensure that emails sent to my Squarespace alias would arrive in my personal Gmail account, and that I could also reply from Gmail **using my Squarespace alias**. Here's how to get that set up.

## The Steps

1. Create a forwarding alias in Squarespace. Follow the directions [here](https://support.squarespace.com/hc/en-us/articles/19000909092237-Email-forwarding-with-a-Squarespace-domain). Set the "forward to" email as the Gmail account you want to use for sending and receiving emails through the alias
   <p align="center" style="padding-top:10px"><img alt="Squarespace Example" src="/assets/images/misc/squarespace-example.png"/></p>
2. Create a Google App Password that you'll use to authorize the Squarespace alias. Follow the instructions [here](https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237). If for some reason you're unable to find the app password page you can access it directly at <https://myaccount.google.com/apppasswords>. The result of this step should be you having an app password, a randomly generated string, from Google. **The generated app password may have spaces, if it does, the spaces matter. Copy the whole thing, spaces and all, and make sure to save it somewhere secure**. You'll need it later.
3. Log into the Gmail account you set as your "forward to" in Step 1. Follow the instructions seen in the image below, which can also be found [here](https://support.google.com/mail/answer/22370?ctx=gsidentifer&sjid=1381297595263705992-NC). Stop when you reach the popup asking for information, as you'll need to be precise about what you enter. A direct link to the "Accounts and Import" page is <https://mail.google.com/mail/u/0/#settings/accounts>.
   <p align="center" style="padding-top:10px"><img alt="Add Another Email" src="/assets/images/misc/add-an-email-address-steps.png"/></p>
4. You should now be on this screen. In the "Name" field, enter your name if it's not already there. In the "Email address" field, enter your **Squarespace domain email alias**. The one you want to send and receive emails from using Gmail. Finally, make sure "Treat as an alias" is checked then click "Next Step".
   <p align="center" style="padding-top:10px"><img alt="Add another email screen" src="/assets/images/misc/add-another-email-screen.png"/></p>
5. On the next screen, enter `smtp.gmail.com` as the "SMTP Server" and your Gmail account email as the "Username". This may seem counterintuitive, but it's the correct process. Don't enter your Squarespace domain alias here. Use the Gmail address you're currently logged into. Then, enter the app password you created in Step 2 as the "Password". Select 465 as the "Port" and choose "Secured connection using SSL" as the connection type. The screenshot below shows how it should look.
   <p align="center" style="padding-top:10px"><img alt="Authentication settings screen" src="/assets/images/misc/smtp-auth-settings-gmail.png"/></p>
6. Click "Add Account".
7. You should now see this confirmation screen. Check the email of your Gmail account for a confirmation link. Click on it once you've received it.
   <p align="center" style="padding-top:10px"><img alt="Confirmation screen" src="/assets/images/misc/confirmation-screen-gmail.png"/></p>
8. This is optional, but you can set it so that whenever you receive an email, you automatically respond using the **same alias the sender used**. This helps ensure you don't accidentally reply from your main email, keeping it private and only interacting through your Squarespace alias. To do this, go back to the "Accounts and Import" tab in Gmail. A direct link to the tab is <https://mail.google.com/mail/u/0/#settings/accounts>. Now that your alias is added, you should see a "Reply from the same address the message was sent to" radio button, go ahead and select it.
   <p align="center" style="padding-top:10px"><img alt="Final Settings" src="/assets/images/misc/final-setting-gmail.png"/></p>

That's it, I hope these instructions work for you!
