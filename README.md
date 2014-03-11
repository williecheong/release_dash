## Release Readiness Dashboard
Dashboards for tracking [Release Statuses of Mozillian Awesomeness](https://release-dash.paas.allizom.org).<br>
More awesome *(and possibly unstable)* new features on [the staging site](http://release-dash.williecheong.com).<br>
Change logs, progress updates and latest developments on [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0ApNDjYXWm5JndDFwLWVlM1BPR3dBdjE1ZVdfWlBwR1E&usp=sharing).

#### Requirements
- Standard Web Stack: Apache, MySQL, PHP 5.3 and above
- For deployment on local machine, try LAMP, [MAMP](http://www.mamp.info/en/downloads/) or [WAMP](http://www.wampserver.com/en/). 

#### Configuration
- Define *production*, *staging* and *development* environments in `/index.php`
- Database credentials for *development* in `/application/config/database.php`
- Landing page (base_url) for *development* in `/application/config/config.php`
- Configuration for other environments in `/application/config/[environment]/______.php`
- If neccessary, modify white-listed dashboard administrators in `/assets/sql/schema.sql`

#### Deployment
1. Clone the repository into the web directory
2. Set up a new MySQL database service on the machine
3. Define database credentials as specified in Configuration above
4. Load the database schema and initial data from `/assets/sql/schema.sql`
5. Done: RRDashboard is now live.


## Features
#### Running with the Train
- Checks for new cycle and updates mappings if current cycle not in database.
- Automatically executed when landing page or version pages are accessed.
- Manually execute through `http://release-dash.../admin/update_cycle`
- External dependencies: [CURRENT_CYCLE](https://wiki.mozilla.org/Template:CURRENT_CYCLE), [CENTRAL_VERSION](https://wiki.mozilla.org/Template:CENTRAL_VERSION)

#### Groups of Queries
- **Groups**:
    - Found on version pages to represent individual release readiness metrics.
    - Accessed through `http://release-dash.../for/[product_tag]/[version_tag]`
    - Every group is visualized on the dashboard as a plot, a current value, or both.
    - Each plot line or current value in a group corresponds to a query in that group.
    - *Custom groups* only apply to a single version of a product.
    - *Default groups* apply across all versions of a product.     
- **Queries**:
    - Bugzilla URLs can be specified to allow direct BZ access from the dashboard. 
    - `<version_tag>` must be used in a Bugzilla URL if the query belongs to a *default group*.
    - For queries in custom groups, the use of `<version_tag>` and `<version_title>` is optional.
    - For queries in default groups, `<version_tag>` and `<version_title>` are neccessary to adapt to version pages.
    - For all queries, `<birthday>` and `<timestamp>` are recommended for specifying time ranges in Qb queries. 
    - Queries may reference historic data. i.e. run same query on an older version.
- **External dependencies**: 
    - [Elasticsearch private cluster](https://github.com/klahnakoski/qb)
    - [Elasticsearch public cluster](https://github.com/klahnakoski/qb)

#### Administration
- Access to login panel through `http://release-dash.../admin`
- Login through Persona using an email address found on the white-list.
- Logging in grants administration privileges to `INSERT` and `DELETE` groups.
- Note: Logging in does **not** enable any user-specific views. 

#### Rules
- To add a rule for this group:
    1. Create a Javascript file as specified in the above "Directory".
    2. Copy the code in "Template" into the newly created Javascript file.
    3. Proceed to script rules. There are inline comments to help guide you.
    4. Ensure the JS file name is correct. Otherwise the rule will not be applied.
    5. If you have production deployment rights, good for you.
    6. Otherwise, submit a pull request to GitHub.
- To modify/delete a rule on this group:
    1. Simply edit/remove the corresponding file from /assets/rules.
    2. Note: There can always be only one rule for each group.

#### Qb Queries


## Testing
To be continued


## Troubleshoot
To be continued<br>

Reach out to [Willie Cheong](http://williecheong.com) for undocumented problems.


## References
- [CodeIgniter](http://ellislab.com/codeigniter): Server side PHP framework
- [CI RestServer](https://github.com/philsturgeon/codeigniter-restserver): Support for REST APIs on CodeIgniter
- [Qb](https://github.com/klahnakoski/qb): Qb queries on Bugzilla's ElasticSearch clusters
- [D3-Rickshaw](http://code.shutterstock.com/rickshaw/): Javascript-based graphing tool
- [Twitter Bootstrap](http://getbootstrap.com/getting-started/): Beautiful user interfaces
- [Spectrum](http://bgrins.github.io/spectrum/): Beautiful colourpicker widget
- [Font Awesome](http://fontawesome.io/): Beautiful HTML icons
- [Gridster](http://gridster.net/): Beautiful grid boxes


## License
[Mozilla Public Liscense v2.0](LICENSE)
